import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const USER = {
  name: 'Yugal Chaudhari',
  subtitle: 'SY BTech student in AIDs from KJ Somaiya',
  skills: ['Video editing', 'Python', 'C++', 'Java', 'Web Dev', 'AI agent builder'],
  hobbies: ['Art', 'Football', 'Fitness', 'Make music'],
  email: 'yugalchaudharixa@gmail.com',
  phone: '+91 99872 21840'
}

function makeCanvasTexture(drawFn, width = 1200, height = 1800) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  drawFn(ctx, width, height)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

function drawFront(ctx, w, h) {
  ctx.fillStyle = '#081226'
  ctx.fillRect(0, 0, w, h)

  ctx.fillStyle = '#f3f7fb'
  ctx.textAlign = 'center'

  ctx.font = '48px sans-serif'
  ctx.fillText(USER.name, w / 2, 120)

  ctx.fillStyle = '#9aa4b2'
  ctx.font = '18px sans-serif'
  ctx.fillText(USER.subtitle, w / 2, 150)

  // skills list
  ctx.textAlign = 'left'
  ctx.fillStyle = '#cfeee4'
  ctx.font = '20px sans-serif'
  const sx = 80
  let y = 210
  ctx.fillStyle = '#9aa4b2'
  ctx.font = '16px sans-serif'
  ctx.fillText('Skills:', sx, y)
  y += 28
  ctx.fillStyle = '#e6eef8'
  USER.skills.forEach(skill => {
    ctx.fillText('• ' + skill, sx + 6, y)
    y += 26
  })

  // hobbies
  y += 8
  ctx.fillStyle = '#9aa4b2'
  ctx.fillText('Hobbies:', sx, y)
  y += 26
  ctx.fillStyle = '#e6eef8'
  ctx.fillText(USER.hobbies.join(' · '), sx + 6, y)
}

function drawBack(ctx, w, h) {
  ctx.fillStyle = '#061022'
  ctx.fillRect(0, 0, w, h)

  ctx.fillStyle = '#e6eef8'
  ctx.textAlign = 'center'
  ctx.font = '36px sans-serif'
  ctx.fillText('Contact', w / 2, 120)

  ctx.font = '18px sans-serif'
  ctx.fillStyle = '#9aa4b2'
  ctx.fillText('Email', w / 2, 200)
  ctx.fillStyle = '#cfeee4'
  ctx.fillText(USER.email, w / 2, 230)

  ctx.fillStyle = '#9aa4b2'
  ctx.fillText('Phone', w / 2, 300)
  ctx.fillStyle = '#cfeee4'
  ctx.fillText(USER.phone, w / 2, 330)
}

export default function App() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(380, 520)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 380 / 520, 0.1, 100)
    camera.position.set(0, 0, 6)

    const amb = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(amb)
    const dir = new THREE.DirectionalLight(0xffffff, 0.6)
    dir.position.set(5, 10, 7.5)
    scene.add(dir)

    const frontTex = new THREE.TextureLoader().load('card.png')
    const backTex = makeCanvasTexture(drawBack)

    const sideMat = new THREE.MeshStandardMaterial({ color: 0x071226 })
    const frontMat = new THREE.MeshStandardMaterial({ map: frontTex })
    const backMat = new THREE.MeshStandardMaterial({ map: backTex })

    const materials = [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]

    const geom = new THREE.BoxGeometry(3.2, 4.4, 0.12)
    const card = new THREE.Mesh(geom, materials)
    scene.add(card)

    card.rotation.x = 0.05

    let targetRotX = 0
    let targetRotY = 0

    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const dx = (x - 0.5) * 2
      const dy = (y - 0.5) * 2
      targetRotY = dx * 0.6
      targetRotX = -dy * 0.6
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove)

    function onResize() {
      const w = mount.clientWidth || 380
      const h = mount.clientHeight || 520
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf = null
    function animate() {
      raf = requestAnimationFrame(animate)
      const dt = clock.getDelta()
      card.rotation.x += (targetRotX - card.rotation.x) * 6 * dt
      card.rotation.y += (targetRotY - card.rotation.y) * 6 * dt
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      if (renderer.domElement && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
      geom.dispose && geom.dispose()
      frontTex.dispose && frontTex.dispose()
      backTex.dispose && backTex.dispose()
      materials.forEach(m => m.dispose && m.dispose())
      renderer.dispose && renderer.dispose()
    }
  }, [])

  return (
    <div className="page animate-fade-in">
      <header className="site-header animate-slide-down">
        <h1 className="animate-scale-in">{USER.name}</h1>
        <p className="lead animate-fade-in-delay">{USER.subtitle}</p>
      </header>

      <main className="main-grid animate-fade-in-up">
        <aside className="scene-col">
          <div className="scene three-scene animate-scale-in" ref={mountRef} aria-hidden="true"></div>
        </aside>

        <section className="content-col">
          <section className="about card-panel animate-slide-in">
            <h2>About</h2>
            <p>I am a SY BTech student focused on AI and creative tooling. I enjoy building web apps, experimenting with AI agents, editing video, and making music.</p>
          </section>

          <section className="projects card-panel animate-slide-in">
            <h2>Projects</h2>
            <div className="project-list">
              {[
                {
                  title: "FRESHFIT",
                  description: "A modern ecommerce website seamless shopping experience."
                },
                {
                  title: "FLEX",
                  description: "A dynamic gym website featuring workout programs, membership management, and fitness tracking tools."
                },
                {
                  title: "AI Agent Demo",
                  description: "Prototype of an AI assistant that automates simple tasks and integrates with web APIs."
                },
                {
                  title: "Video Editor",
                  description: "Great Experience in short video editing."
                }
              ].map((project, index) => (
                <article key={project.title} className={`project`}> 
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="skills card-panel animate-slide-in">
            <h2>Skills</h2>
            <ul>
              {USER.skills.map((skill, index) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <section className="contact card-panel animate-slide-in">
            <h2>Contact</h2>
            <p className="animate-fade-in-delay">Email: <a href={`mailto:${USER.email}`}>{USER.email}</a></p>
            <p className="animate-fade-in-delay-2">Phone: <a href={`tel:${USER.phone}`}>{USER.phone}</a></p>
          </section>
        </section>
      </main>

      <footer className="footer animate-fade-in-delay">
        <small>© {new Date().getFullYear()} {USER.name} — Built with React & Three.js</small>
      </footer>
    </div>
  )
}
