import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Grid,
    Tabs,
    Tab,
    Paper,
    Divider,
    Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { getEC2Metrics } from "../../api/cognify-api"; // Import your API function

// Sample instance IDs - replace with your actual instance IDs or make them configurable
const DEFAULT_TORCHSERVE_INSTANCE_ID = "i-055e71e433476071d";
const DEFAULT_APP_INSTANCE_ID = "i-0ff04a41c77af078e";

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
    );
};

// Format timestamp to a readable format
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
};

// Process chart data to make it more readable
const processChartData = (metricData, metricName) => {
    if (!metricData || !metricData.data) return [];

    return metricData.data.map((item) => {
        let value = item.value;

        return {
            timestamp: formatTimestamp(item.timestamp),
            rawTimestamp: item.timestamp,
            value: value,
            rawValue: item.value,
        };
    });
};

// Chart component for a single metric
const MetricChart = ({ metricData, title, color }) => {
    if (!metricData || !metricData.data || metricData.data.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    No data available
                </Typography>
            </Box>
        );
    }

    const chartData = processChartData(metricData, metricData.name);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = payload[0].payload.rawValue;
            const timestamp = new Date(
                payload[0].payload.rawTimestamp
            ).toLocaleString();

            let formattedValue;
            if (
                metricData.name === "NetworkIn" ||
                metricData.name === "NetworkOut"
            ) {
                formattedValue = formatBytes(value);
            } else {
                formattedValue = `${value.toFixed(2)} ${metricData.unit}`;
            }

            return (
                <Paper
                    elevation={3}
                    sx={{ p: 1, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                    <Typography variant="body2">{timestamp}</Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        fontWeight="bold"
                    >
                        {formattedValue}
                    </Typography>
                </Paper>
            );
        }
        return null;
    };

    return (
        <Card elevation={2} sx={{ mb: 2, height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="timestamp"
                            tick={{ fontSize: 12 }}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => {
                                if (
                                    metricData.name === "NetworkIn" ||
                                    metricData.name === "NetworkOut"
                                ) {
                                    return formatBytes(value, 0);
                                }
                                return value.toFixed(1);
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            activeDot={{ r: 8 }}
                            name={metricData.name}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

// Full EC2 Metrics Dashboard component
const EC2MetricsDashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);

    // Instance IDs can be made configurable through props or state
    const torchServeInstanceId = DEFAULT_TORCHSERVE_INSTANCE_ID;
    const appInstanceId = DEFAULT_APP_INSTANCE_ID;

    // Colors for the charts
    const chartColors = [
        "#3f51b5", // CPU - Indigo
        "#2196f3", // Network In - Blue
        "#ff9800", // Network Out - Orange
    ];

    // Fetch metrics function that can be called on demand
    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const data = await getEC2Metrics(
                torchServeInstanceId,
                appInstanceId
            );
            setMetrics(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching metrics:", err);
            setError("Failed to fetch EC2 metrics. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch metrics when component mounts
    useEffect(() => {
        fetchMetrics();

        // Set up polling every minute
        const intervalId = setInterval(fetchMetrics, 60000);
        return () => clearInterval(intervalId);
    }, [torchServeInstanceId, appInstanceId]);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    // Function to get the appropriate metric data
    const getMetricByName = (instanceMetrics, metricName) => {
        if (!instanceMetrics || !instanceMetrics.metrics) return null;
        return (
            instanceMetrics.metrics.find((m) => m.name === metricName) || null
        );
    };

    // Render loading state
    if (loading && !metrics) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // Render error state
    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Instance data based on selected tab
    const instanceData =
        currentTab === 0 ? metrics?.torchServeMetrics : metrics?.appMetrics;

    // Find metrics for the current instance
    const cpuMetric = getMetricByName(instanceData, "CPUUtilization");
    const networkInMetric = getMetricByName(instanceData, "NetworkIn");
    const networkOutMetric = getMetricByName(instanceData, "NetworkOut");

    const instanceName = currentTab === 0 ? "TorchServe" : "Application";

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                EC2 Instances Monitoring
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10}>
                        <Tabs value={currentTab} onChange={handleTabChange}>
                            <Tab label="TorchServe Instance" />
                            <Tab label="Application Instance" />
                        </Tabs>
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: "right" }}>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={fetchMetrics}
                            disabled={loading}
                            size="small"
                        >
                            Refresh
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Typography variant="h5" gutterBottom>
                {instanceName} Instance ({instanceData?.instanceId})
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <MetricChart
                        metricData={cpuMetric}
                        title="CPU Utilization"
                        color={chartColors[0]}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MetricChart
                        metricData={networkInMetric}
                        title="Network In"
                        color={chartColors[1]}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MetricChart
                        metricData={networkOutMetric}
                        title="Network Out"
                        color={chartColors[2]}
                    />
                </Grid>
            </Grid>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                Last updated: {new Date().toLocaleString()}
            </Typography>
        </Box>
    );
};

export default EC2MetricsDashboard;
