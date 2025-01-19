import React from 'react';
import Hero from "../components/services/Hero";
import OurServices from "../components/services/OurServices";
import Extra from "../components/services/Extra";
import Support from "../components/services/Support";

function Services() {
    return (
        <div>
            <Hero/>
            <OurServices />
            <Extra />
            <Support />
        </div>
    )
}
export default Services;