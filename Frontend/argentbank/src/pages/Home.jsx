import Hero from '../components/hero/Hero.jsx' 
import Features from '../components/features/Features.jsx'
import featureData from "../data/featureData.json";


const Home = () => {
    const feature = featureData.feature
    return (
        <>
            <Hero />
            <section className='features'>
                <h2 className="sr-only">Features</h2>
                {feature.map((feature, index) => (
                    <Features 
                        key={index}
                        image={feature.image}
                        alt={feature.alt}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </section>
        </>
    )
}
export default Home