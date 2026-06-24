import { SOCIAL_LINKS } from '../constants/social'
import { SOCIAL_ICONS } from '../constants/socialIcons'
import { COLORS } from '../constants/colors'
import { EmailIcon } from '../components/ui/icons'
import Starburst from '../components/ui/Starburst'
import PillLink from '../components/ui/PillLink'
import ContactForm from '../components/ui/ContactForm'
import MobileIcons from '../components/ui/MobileIcons'

function Contact() {
  return (
    <section
      id="contact"
      className="relative z-30 bg-[#e8eaed] flex flex-col"
      style={{
        borderTop: `4px solid ${COLORS.dark}`,
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.18) 2px, transparent 2px)`,
        backgroundSize: '28px 28px',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${COLORS.lightGray} 0%, transparent 12%, transparent 88%, ${COLORS.lightGray} 100%)`, zIndex: 1 }} />

      <div className="relative z-10 flex flex-col lg:flex-row flex-1 px-4 md:px-16 lg:px-24 py-20 md:py-28 gap-10 lg:gap-16 max-w-7xl 2xl:max-w-[1600px] mx-auto w-full items-stretch overflow-visible">

        {/* Left — info */}
        <div className="lg:w-2/5 flex flex-col self-stretch gap-10">
          <div className="relative">
            <Starburst />
            <div className="relative z-10">
              <span className="inline-block font-mono text-xs font-bold text-white px-3 py-1 mb-4" style={{ background: COLORS.dark, transform: 'rotate(-2deg)', borderRadius: '2px' }}>
                // contact
              </span>
              <h2 className="font-bold leading-none tracking-tight mb-6" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 6vw, 5.5rem)', color: COLORS.dark }}>
                Let's build<br />something.
              </h2>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.bodyText }}>
                Open to internships, new grad roles, and interesting projects. Let's make something great together.
              </p>
            </div>
          </div>

          <div className="hidden sm:grid sm:grid-cols-2 lg:flex lg:flex-col sm:gap-3 lg:gap-3 w-full">
            <PillLink href="mailto:dev.bryanfernandez@gmail.com" label="Email" icon={<EmailIcon size={15} />} text="dev.bryanfernandez@gmail.com" />
            {SOCIAL_LINKS.map(link => (
              <PillLink key={link.id} href={link.href} label={link.label} icon={SOCIAL_ICONS[link.id](15)} text={link.value} target="_blank" rel="noopener noreferrer" />
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:w-[52%] w-full self-stretch flex flex-col mx-auto lg:mx-0" style={{ marginRight: '8px', marginBottom: '8px' }}>
          <div className="p-5 md:p-7 flex-1 flex flex-col justify-between" style={{ background: COLORS.dark, border: `3px solid ${COLORS.dark}`, boxShadow: `6px 6px 0 ${COLORS.accentGreen}`, borderRadius: '4px' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center px-3 py-1" style={{ background: COLORS.accentYellow, border: `2px solid ${COLORS.dark}`, borderRadius: '2px' }}>
                <p className="font-mono text-xs font-bold" style={{ color: COLORS.dark }}>GET IN TOUCH</p>
              </div>
              <MobileIcons />
            </div>
            <ContactForm />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
