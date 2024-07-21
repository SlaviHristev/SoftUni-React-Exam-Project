import './about.scss'
import { motion } from 'framer-motion';

const About = () => {


    const textVariants = {
        initial: {
            x: -500,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1,
            },
        },
    };
    const imgVariant = {
        initial: {
            x: 500,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1,
            },
        },
    };
     

    return (
        <motion.div className='about' >
            <motion.div className="textContent" variants={textVariants} initial='initial' animate='animate'>
                <motion.div className="introduction">
                    <h1>About Exotic Car Shop</h1>
                    <p>Your premier destination for buying and selling cars online. Whether you are looking to buy your dream car or sell your current one, we provide a simple, fast, and secure platform to meet all your automotive needs.</p>

                </motion.div>
                <motion.div className="mission">
                    <h2>Our mission</h2>
                    <p>Our mission is to bridge the gap between car buyers and sellers, offering a user-friendly platform that ensures a seamless and trustworthy transaction process.</p>
                </motion.div>
                <motion.div className="offers">
                    <h2>What We Offer</h2>
                    <ul>
                        <li><strong>Extensive Listings:</strong> Find a wide variety of cars from different makes and models, all in one place.</li>
                        <li><strong>User-Friendly Interface:</strong> Our website is designed with simplicity in mind, making it easy for you to browse, compare, and choose the perfect car.</li>
                        <li><strong>Advanced Search Filters:</strong> Utilize our advanced search filters to find cars based on criteria such as price, make, model, year, mileage, and location.</li>
                        <li><strong>Secure Transactions:</strong> We prioritize your safety by offering secure payment options and verified listings to ensure a trustworthy experience.</li>
                        <li><strong>Comprehensive Car Profiles:</strong> Each listing comes with detailed information and high-quality images to help you make informed decisions.</li>
                    </ul>
                </motion.div>
                <motion.div className="howItWorks">
                    <h2>How It Works</h2>
                    <h3>For Buyers</h3>
                    <p>Browse through our extensive listings and use the search filters to find cars that match your preferences. Contact sellers directly through our platform to negotiate and finalize the purchase.</p>
                    <h3>For Sellers</h3>
                    <p>Create an account, list your car with detailed descriptions and photos, and reach a wide audience of potential buyers. Manage your listings and respond to inquiries through our user-friendly dashboard.</p>
                </motion.div>
                <motion.div className="whyChooseUs">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li><strong>Trusted Platform:</strong> Thousands of satisfied users have successfully bought and sold cars through our website.</li>
                        <li><strong>Continuous Improvement:</strong> We continually update our platform based on user feedback to provide an even better experience.</li>
                    </ul>
                </motion.div>
            </motion.div>
            <motion.div className="imgContainer" >
                <motion.img src="/background.png" alt="" variants={imgVariant} initial='initial' animate='animate'/>
            </motion.div>

        </motion.div>
    )
}

export default About