import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1U8ZiGK7u6Ili779Zvvbga7S',
    'seeker_premium': 'price_1U8ZbTK7u6Ili779xAdTEF8E',
    'recruiter_growth': 'price_1U8jcfK7u6Ili779qagDrvzb',
    'recruiter_enterprise': 'price_1U8jdZK7u6Ili779E0Lge6Gv'
}


//price_1U8ZiGK7u6Ili779Zvvbga7S
//price_1TfJPVIzLpOm3WSXBhF4w7Qm