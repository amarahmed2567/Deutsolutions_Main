import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './TranslationTransform.css'

const translationScenarios = [
  {
    source: {
      title: 'شهادة ميلاد',
      lines: ['جمهورية مصر العربية', 'وزارة الداخلية', 'قطاع الأحوال المدنية'],
      status: 'جاري الترجمة',
    },
    target: {
      title: 'Geburtsurkunde',
      lines: ['Arabische Republik Ägypten', 'Innenministerium', 'Sektor für Personenstandswesen'],
      status: 'Übersetzung abgeschlossen',
    },
  },
  {
    source: {
      title: 'تقرير طبي',
      lines: ['جمهورية مصر العربية', 'وزارة الصحة والسكان', 'تقرير طبي رسمي'],
      status: 'جاري الترجمة',
    },
    target: {
      title: 'Ärztlicher Bericht',
      lines: ['Arabische Republik Ägypten', 'Ministerium für Gesundheit', 'Offizieller medizinischer Bericht'],
      status: 'Übersetzung abgeschlossen',
    },
  },
  {
    source: {
      title: 'شهادة جامعية',
      lines: ['جمهورية مصر العربية', 'وزارة التعليم العالي', 'شهادة إتمام الدراسة الجامعية'],
      status: 'جاري الترجمة',
    },
    target: {
      title: 'Hochschulzeugnis',
      lines: ['Arabische Republik Ägypten', 'Ministerium für Hochschulbildung', 'Zeugnis über den Hochschulabschluss'],
      status: 'Übersetzung abgeschlossen',
    },
  },
  {
    source: {
      title: 'عقد',
      lines: ['جمهورية مصر العربية', 'وثيقة تعاقد رسمية', 'تم التوقيع بين الطرفين'],
      status: 'جاري الترجمة',
    },
    target: {
      title: 'Vertrag',
      lines: ['Arabische Republik Ägypten', 'Offizielles Vertragsdokument', 'Von beiden Parteien unterzeichnet'],
      status: 'Übersetzung abgeschlossen',
    },
  },
]

const documentFieldsCount = 4

function TranslationTransform() {
  const { content } = useLanguage()
  const rootRef = useRef(null)
  const paperRef = useRef(null)
  const scannerRef = useRef(null)
  const titleRef = useRef(null)
  const lineRefs = useRef([])
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [translatedFields, setTranslatedFields] = useState(() => Array(documentFieldsCount).fill(false))
  const [isComplete, setIsComplete] = useState(false)
  const scenario = translationScenarios[scenarioIndex]

  useLayoutEffect(() => {
    if (!rootRef.current || !paperRef.current || !scannerRef.current) return undefined

    let media
    const context = gsap.context(() => {
      media = gsap.matchMedia(rootRef.current)
      media.add({
        reduceMotion: '(prefers-reduced-motion: reduce)',
        canHover: '(hover: hover) and (pointer: fine)',
      }, ({ conditions }) => {
        const paper = paperRef.current
        const scanner = scannerRef.current
        const fields = [titleRef.current, ...lineRefs.current].filter(Boolean)

        if (conditions.reduceMotion) {
          setTranslatedFields(Array(documentFieldsCount).fill(true))
          setIsComplete(true)
          gsap.set(scanner, { autoAlpha: 0 })
          return undefined
        }

        setTranslatedFields(Array(documentFieldsCount).fill(false))
        setIsComplete(false)

        let timeline
        let observer

        const createTimeline = () => {
          timeline?.kill()
          const paperBounds = paper.getBoundingClientRect()
          const paperHeight = paper.clientHeight
          const scannerTop = Number.parseFloat(getComputedStyle(scanner).top) || 0
          const scanDistance = Math.max(0, paperHeight - scanner.offsetHeight - scannerTop)
          const fieldProgress = fields.map((field) => {
            const bounds = field.getBoundingClientRect()
            const center = bounds.top - paperBounds.top + bounds.height / 2
            return gsap.utils.clamp(0, 1, (center - scannerTop) / scanDistance)
          })
          const scanDuration = 1.8
          const returnStart = scanDuration + 0.75

          gsap.set(fields, { clearProps: 'filter,opacity,transform' })
          gsap.set(scanner, { y: 0, autoAlpha: 0 })

          timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.3 })
          timeline.call(() => {
            setTranslatedFields(Array(documentFieldsCount).fill(false))
            setIsComplete(false)
          }, [], 0)
          timeline.set(scanner, { autoAlpha: 1 }, 0)
          timeline.to(scanner, { y: scanDistance, duration: scanDuration, ease: 'none' }, 0)

          fieldProgress.forEach((progress, index) => {
            const field = fields[index]
            const arrival = progress * scanDuration
            timeline.to(field, {
              opacity: 0,
              y: 7,
              filter: 'blur(4px)',
              duration: 0.14,
              ease: 'power1.out',
            }, arrival)
            timeline.call(() => {
              setTranslatedFields((current) => current.map((value, fieldIndex) => fieldIndex === index ? true : value))
            }, [], arrival + 0.14)
            timeline.to(field, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.18,
              ease: 'power1.out',
            }, arrival + 0.14)
          })

          timeline.to(scanner, { autoAlpha: 0, duration: 0.12 }, scanDuration)
          timeline.call(() => setIsComplete(true), [], scanDuration + 0.18)
          timeline.to({}, { duration: 0.55 }, scanDuration + 0.2)
          timeline.to(scanner, { y: 0, duration: scanDuration, ease: 'none', autoAlpha: 1 }, returnStart)

          fieldProgress.forEach((progress, index) => {
            const field = fields[index]
            const arrival = returnStart + (1 - progress) * scanDuration
            timeline.to(field, {
              opacity: 0,
              y: -7,
              filter: 'blur(4px)',
              duration: 0.14,
              ease: 'power1.out',
            }, arrival)
            timeline.call(() => {
              setTranslatedFields((current) => current.map((value, fieldIndex) => fieldIndex === index ? false : value))
            }, [], arrival + 0.14)
            timeline.to(field, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.18,
              ease: 'power1.out',
            }, arrival + 0.14)
          })

          timeline.to(scanner, { autoAlpha: 0, duration: 0.12 }, returnStart + scanDuration)
          timeline.call(() => {
            setIsComplete(false)
            setScenarioIndex((current) => (current + 1) % translationScenarios.length)
          }, [], returnStart + scanDuration + 0.28)
        }

        createTimeline()

        const lastSize = { width: paper.clientWidth, height: paper.clientHeight }
        observer = new ResizeObserver(() => {
          if (paper.clientWidth === lastSize.width && paper.clientHeight === lastSize.height) return
          lastSize.width = paper.clientWidth
          lastSize.height = paper.clientHeight
          setTranslatedFields(Array(documentFieldsCount).fill(false))
          setIsComplete(false)
          createTimeline()
        })
        observer.observe(paper)

        if (conditions.canHover) {
          gsap.set(paper, { transformPerspective: 1100, transformOrigin: 'center center' })
          const rotateX = gsap.quickTo(paper, 'rotationX', { duration: 0.5, ease: 'power2.out' })
          const rotateY = gsap.quickTo(paper, 'rotationY', { duration: 0.5, ease: 'power2.out' })
          const moveX = gsap.quickTo(paper, 'x', { duration: 0.5, ease: 'power2.out' })
          const moveY = gsap.quickTo(paper, 'y', { duration: 0.5, ease: 'power2.out' })

          const onPointerMove = (event) => {
            if (event.pointerType !== 'mouse') return
            const bounds = paper.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width
            const y = (event.clientY - bounds.top) / bounds.height
            rotateX((0.5 - y) * 9)
            rotateY((x - 0.5) * 11)
            moveX((x - 0.5) * 5)
            moveY((y - 0.5) * 5)
            paper.style.setProperty('--tt-pointer-x', `${x * 100}%`)
            paper.style.setProperty('--tt-pointer-y', `${y * 100}%`)
          }

          const onPointerLeave = () => {
            rotateX(0)
            rotateY(0)
            moveX(0)
            moveY(0)
            paper.style.setProperty('--tt-pointer-x', '50%')
            paper.style.setProperty('--tt-pointer-y', '50%')
          }

          paper.addEventListener('pointermove', onPointerMove)
          paper.addEventListener('pointerleave', onPointerLeave)

          return () => {
            timeline?.kill()
            observer?.disconnect()
            paper.removeEventListener('pointermove', onPointerMove)
            paper.removeEventListener('pointerleave', onPointerLeave)
          }
        }

        return () => {
          timeline?.kill()
          observer?.disconnect()
        }
      })
    }, rootRef)

    return () => {
      media?.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="translation-transform-section" ref={rootRef} aria-labelledby="translation-transform-heading">
      <div className="translation-transform-section__inner">
        <div className="translation-transform__copy">
          <p className="translation-transform__eyebrow">{content.hero.eyebrow}</p>
          <h1 className="translation-transform__heading" id="translation-transform-heading">
            {content.hero.headingFirst}<br />{content.hero.headingSecond}
          </h1>
          <p className="translation-transform__description">{content.hero.description}</p>
          <div className="translation-transform__languages" aria-label={content.hero.languagesLabel}>
            <span lang="de">Deutsch</span>
            <span lang="ar" dir="rtl">العربية</span>
            <span lang="en">English</span>
          </div>
          <a className="translation-transform__cta" href="#kontakt">
            {content.hero.cta} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="translation-transform__visual">
          <div className="translation-transform__language-badge translation-transform__language-badge--arabic" aria-hidden="true">
            <span>AR</span><small>{content.hero.badgeArabic}</small>
          </div>
          <div className="translation-transform__language-badge translation-transform__language-badge--german" aria-hidden="true">
            <span>DE</span><small>{content.hero.badgeGerman}</small>
          </div>

          <article className="translation-transform__document" ref={paperRef} aria-label={`${content.hero.badgeArabic} → ${content.hero.badgeGerman}`}>
            <div className="translation-transform__scanner" ref={scannerRef} aria-hidden="true" />
            <div className="translation-transform__document-header">
              <div className="translation-transform__seal" aria-hidden="true"><span /></div>
              <div className="translation-transform__document-heading">
                <span>{content.hero.documentLabel}</span>
                <strong>{content.hero.copyLabel}</strong>
              </div>
              <span className="translation-transform__language-code">{isComplete ? 'DE' : 'AR'}</span>
            </div>

            <div className="translation-transform__status" role="status" aria-live="polite">
              <span className={`translation-transform__status-dot${isComplete ? ' is-complete' : ''}`} />
              <span lang={isComplete ? 'de' : 'ar'} dir={isComplete ? 'ltr' : 'rtl'}>
                {isComplete ? content.hero.completeStatus : content.hero.sourceStatus}
              </span>
            </div>

            <div className="translation-transform__document-body">
              <span className="translation-transform__document-kicker">{isComplete ? content.hero.targetKicker : content.hero.sourceKicker}</span>
              <h2
                className="translation-transform__document-title"
                ref={titleRef}
                lang={translatedFields[0] ? 'de' : 'ar'}
                dir={translatedFields[0] ? 'ltr' : 'rtl'}
              >
                {translatedFields[0] ? scenario.target.title : scenario.source.title}
              </h2>
              <div className="translation-transform__document-lines">
                {scenario.source.lines.map((line, index) => {
                  const fieldIndex = index + 1
                  const isTranslated = translatedFields[fieldIndex]
                  return (
                    <p
                      className="translation-transform__document-line"
                      key={index}
                      ref={(element) => { lineRefs.current[index] = element }}
                      lang={isTranslated ? 'de' : 'ar'}
                      dir={isTranslated ? 'ltr' : 'rtl'}
                    >
                      {isTranslated ? scenario.target.lines[index] : line}
                    </p>
                  )
                })}
              </div>
              <div className="translation-transform__placeholder-lines" aria-hidden="true">
                <span /><span /><span />
              </div>
            </div>

            <div className={`translation-transform__document-footer${isComplete ? ' is-complete' : ''}`}>
              <div className="translation-transform__qa-mark"><span aria-hidden="true">✓</span> {content.hero.qa}</div>
              <span className="translation-transform__layout-note">{content.hero.layout}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default TranslationTransform