import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Subscription name is required'], trim: true, minLength: 2, maxLength: 100 },
    price: { type: Number, required: [true, 'Plan price is required'], min: [0, 'Plan price must be greater than 0'] },
    currency: { type: String, enum: ['USA', 'EUR', 'INR'], default: 'INR', required: [true, 'Currency is required'] },
    frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'], required: true },
    category: { type: String, enum: ['Sports', 'Education', 'Entertainment', 'Productivity', 'Health', 'Technology', 'Finance', 'Politics', 'Other'], required: true },
    paymentMethod: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Active', 'Expired', 'Cancelled'], default: 'Active' },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, { timestamps: true });

// Auto-calculate renewal date .pre will run before saving document to DB
subscriptionSchema.pre('save', function (next) {
    // Calculate renewal date based on frequency
    if(!this.renewalDate){
        const renewalPeriods = {
            Daily: 1,
            Weekly: 7,
            Monthly: 30,
            Yearly: 365
        };
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
    }
    // Auto-update status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status='Expired';
    }
    next();
});
const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;