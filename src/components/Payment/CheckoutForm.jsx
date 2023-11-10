import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import './checkoutform.css'
import { useLocationContext } from '../../context/Location_context';


const Authentication = JSON.parse(localStorage.getItem("token"))
const CheckoutForm = ({ selectedseats,totalTicketPrice,storedTempoTickets }) => {
    const {baseUrl} =useLocationContext()
 
    // const { price, _id } = appoinment; 
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch(`${baseUrl}/api/auth/payment/create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ totalTicketPrice })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
      
    }, [totalTicketPrice]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                transId: storedTempoTickets._id
            },

        });

        if (error) {
            setError(error.message);
            setSuccess('');
        }
        else {
            setError('');
         
        }

        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,


                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Your payment processed successfully.')
           
            setProcessing(false);
            // save to database


            (async()=>{
              
                try{
                    const res =await fetch(`${baseUrl}/api/auth/booking/bookseat/${selectedseats[0].id}`,{
                        method: "POST",
                        headers: {
                            "content-Type": "application/json",
                            "Authentication": Authentication
                        
                        },
                        body: JSON.stringify(storedTempoTickets)

                    })
                
                   
                   const result =await res.json()
                   console.log(result,'result from payment page')
                //    setStoredTicketsId(result.result)

                }catch(e){
                    console.log(e,'error form bookseat fetch')

                }

            })()
        
         
        }

    }
    return (
        <div className='checkoutform'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                // color: '#424770',
                                color: 'white',
                                '::placeholder': {
                                    // color: '#aab7c4',
                                    color: 'white',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {processing ? 'loading' : <button type="submit" className='px-7 py-2 my-3 rounded-lg  bg-orange-500' disabled={!stripe || success}>
                    Pay {totalTicketPrice}
                </button>}
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;