import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 opacity-90" />
      <div className="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-mint/40 blur-3xl" />
      <div className="absolute bottom-0 right-10 w-64 h-64 rounded-full bg-aqua/40 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-teal-100 max-w-2xl">{subtitle}</p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}

export default PageHeader
