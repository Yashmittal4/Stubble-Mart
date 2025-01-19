import { motion } from "framer-motion"
import ab7 from "../../assets/svg/slbg3 1.svg"
export default function Animate() {
    return (
        <div className="w-full ">
            <div className=" w-full h-[570px] absolute z-[-1]">
                <img src={ab7} alt="dfhda" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>

            <div className="w-[80%] mx-auto flex justify-center items-center h-[600px] ">
                <h2 className="sm:text-[150px] text-[70px] text-white font-bold text-center">
                    <motion.div initial={{ x: -300 }} whileInView={{ x: 0, transition: { duration: 1.5 } }}>
                        STUBBLE
                    </motion.div>
                    <motion.div initial={{ x: 300 }} whileInView={{ x: 0, transition: { duration: 1.8 } }}>
                        MART
                    </motion.div>
                </h2>
            </div>
        </div>
    )
}