import mongoose from "mongoose";
//import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            enum: ["Mr", "Ms", "Mrs", "Dr"],
        },
        firstname: { type: String, required: true },
        surname: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: [
                "Student",
                "Researcher",
                "Geriatrician",
                "Physician",
                "Neurosurgeon",
            ],
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                        value
                    );
                },
                message: (props) =>
                    `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    // Regular expression for password validation
                    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                        value
                    );
                },
                message: (props) =>
                    `Password must be at least 8 characters long and include at least one letter, one digit, and one special character.`,
            },
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
};

UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
};

UserSchema.pre("save", async function (next) {
    const saltRounds = 10; // You can adjust the number of salt rounds
    //const user = this;
    if (this.isModified("password") || this.isNew) {
        try {
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export default mongoose.model("User", UserSchema);
