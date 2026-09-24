import { ImageResponse } from 'next/og'

export const alt = 'Dinesh Seervi — CS Student'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#f4f4f1',
          color: '#292623',
          border: '16px solid #292623',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
          <span>DS.</span>
          <span>Portfolio / 2026</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            I build AI systems that turn complex work into useful products.
          </div>
          <div style={{ fontSize: 28, color: '#3157d5', fontWeight: 700 }}>
            Dinesh Seervi · CS Student · Pune, India
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
