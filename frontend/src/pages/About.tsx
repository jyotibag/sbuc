import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

const About = () => {
  return (
    <div>
      <PageHeader
        title="About SBUC"
        subtitle="Shibani Banerjee's Unique Collection brings Santiniketan artistry to modern wardrobes."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <h2 className="text-3xl font-bold mb-4">Our Santiniketan Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SBUC celebrates the soulful craft traditions of Santiniketan - a place where art, music, and handloom
              intertwine. We collaborate with artisans to reimagine heritage textiles and handcrafted jewelry in
              contemporary silhouettes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every piece is intentionally curated, rooted in feminine elegance and vibrant teal palettes that embody
              our signature aesthetic: funky, premium, and endlessly wearable.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-6"
          >
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200"
              alt="Santiniketan artisans"
              className="rounded-3xl w-full h-96 object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Handcrafted', text: 'Made slowly by artisans who keep heritage alive.' },
            { title: 'Premium Feel', text: 'Soft textures, luxe finishes, and delicate detailing.' },
            { title: 'Feminine & Funky', text: 'Bold color stories with elegant silhouettes.' },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
