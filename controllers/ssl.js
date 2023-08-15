import SSLCommerzPayment from 'sslcommerz-lts';
import { Appointment } from '../models/Appointment.js';

//sslcommerz init
export const initiateSSL = async (req, res) => {
    // console.log(`${req.protocol}://${req.get('host')}`)
    //using validate instead success url 
    let data = {
        ...req.body,
        currency: 'BDT',
        success_url: `${req.protocol}://${req.get('host')}/api/payment/ssl-validate`,
        fail_url: `${req.protocol}://${req.get('host')}/api/payment/ssl-fail`,
        cancel_url: `${req.protocol}://${req.get('host')}/api/payment/ssl-cancel`,
        ipn_url: `${req.protocol}://${req.get('host')}/api/payment/ssl-ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Test',
        cus_email: 'test@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Mymensingh',
        cus_state: 'Dhaka',
        cus_postcode: 2200,
        cus_country: 'BD',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'test Ship',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 2200,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };

    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASS, false) //true for live default false for sandbox
    const r1 = await sslcommer.init(data);
    return res.status(200).json({
        success: true,
        data: r1
    });

    //    res.redirect(r1.GatewayPageURL)

}

export const SSLipn = async (req, res) => {

    return res.status(200).json({
        success: true,
        data: req.body
    });
}

export const SSLsuccess = async (req, res, next) => {
    req.val_id = req.body.val_id;
    next()
  
    //  res.redirect(`${ process.env.NODE_ENV === 'development' ?  process.env.DEV_DOMAIN : process.env.LIVE_DOMAIN }/payment/success`)
}

export const SSLfailure = async (req, res) => {
   
    return res.redirect(`${ process.env.NODE_ENV === 'development' ?  process.env.DEV_DOMAIN : process.env.LIVE_DOMAIN }/payment/fail`)
}

export const SSLcancel = async (req, res) => {
    
    return res.redirect(`${ process.env.NODE_ENV === 'development' ?  process.env.DEV_DOMAIN : process.env.LIVE_DOMAIN }/payment/fail`)
}

export const SSLvalidate = async (req, res) => {
    //tran_id = order_id
    const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASS, false)
    const r1 = await sslcz.validate({ val_id: req.val_id })
  

    //     status: 'VALID',
    //   tran_date: '2023-07-10 01:22:10',
    //   tran_id: '64a7970226a85c67bd52c960',
    //   val_id: '230710122150Ori2BHMNv6o4Fw',
    //   amount: '900.00',
    //   store_amount: '877.5',
    //   currency: 'BDT',
    //   bank_tran_id: '230710122150KUSiTynDJumN4d',
    //   card_type: 'BKASH-BKash',
    //   card_no: '',
    //   card_issuer: 'BKash Mobile Banking',
    //   card_brand: 'MOBILEBANKING',
    //   card_category: 'MOBILE',
    //   card_sub_brand: '',
    //   card_issuer_country: 'Bangladesh',
    //   card_issuer_country_code: 'BD',
    //   currency_type: 'BDT',
    //   currency_amount: '900.00',
    //   currency_rate: '1.0000',
    //   base_fair: '0.00',
    //   value_a: 'ref001_A',
    //   value_b: 'ref002_B',
    //   value_c: 'ref003_C',
    //   value_d: 'ref004_D',
    //   emi_instalment: '0',
    //   emi_amount: '0.00',
    //   emi_description: '',
    //   emi_issuer: 'BKash Mobile Banking',
    //   account_details: '',
    //   risk_title: 'Safe',
    //   risk_level: '0',
    //   discount_percentage: '0',
    //   discount_amount: '0.00',
    //   discount_remarks: '',
    //   APIConnect: 'DONE',
    //   validated_on: '2023-07-10 01:22:18',
    //   gw_version: '',
    //   offer_avail: 1,
    //   card_ref_id: 'dc1da4f52669828139e81ef5eb0f48a5a99ea054a131e00a562887d455417dd901',
    //   isTokeizeSuccess: 0,
    //   campaign_code: ''

    const appointment = await Appointment.findById(r1.tran_id);
    appointment.isPaid = true;
    appointment.paidAt = Date.now();
    appointment.paymentMethod = r1.card_type;
    await appointment.save();

    res.redirect(`${ process.env.NODE_ENV === 'development' ?  process.env.DEV_DOMAIN : process.env.LIVE_DOMAIN }/booked-appointments?status=${r1.status}`)
}