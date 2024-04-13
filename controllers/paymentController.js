const Razorpay = require('razorpay');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const renderProductPage = async (req, res) => {
    try {
        res.render('product');
    } catch (error) {
        console.error('Error rendering product page:', error.message);
        res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
}

const createOrder = async (req, res) => {
    try {
        // Convert amount to integer
        const amount = parseInt(req.body.amount);

        // Check if the amount is a valid integer
        if (isNaN(amount) || !Number.isInteger(amount)) {
            throw new Error('The amount must be an integer.');
        }

        // Convert the amount to paise (as per Razorpay's requirement)
        const amountInPaise = amount * 100;

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        };

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.error('Error creating order:', err);
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            } else {
                res.status(200).send({
                    success: true,
                    msg: 'Order Created',
                    order_id: order.id,
                    amount: amountInPaise,
                    key_id: RAZORPAY_ID_KEY,
                    product_name: req.body.name,
                    description: req.body.description,
                    contact: "8567345632",
                    name: "Sandeep Sharma",
                    email: "sandeep@gmail.com"
                });
            }
        });
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    renderProductPage,
    createOrder
}
