import { existsSync } from 'fs'
import { join } from 'path'
import Image from 'next/image'

export default function Portrait() {
  const hasPhoto = existsSync(join(process.cwd(), 'public', 'profile.jpg'))

  return (
    <div className="photo-frame">
      {hasPhoto ? (
        <Image
          src="/profile.jpg"
          alt="Dinesh Seervi"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 38vw"
        />
      ) : (
        <div className="photo-fallback" role="img" aria-label="Dinesh Seervi, computer science student">
          <span>DS</span>
          <small>CS Student</small>
        </div>
      )}
    </div>
  )
}
