import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'

function Word({ children, position, ...props }) {
    const color = new THREE.Color()
    const fontProps = { fontSize: 0.5,  lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover
    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer'
        return () => (document.body.style.cursor = 'auto')
    }, [hovered])
    // Tie component to the render-loop
    useFrame(({ camera }) => {
        ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
    })
    return (
        <Billboard position={position} {...props}>
            <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...fontProps} children={children} />
        </Billboard>
    )
}

export default function App() {
    return (
        <>
            <fog attach="fog" args={['#202025', 0, 80]} />
            <Word position={[0, 0, -10]} children="N" />
            <Word position={[0, 0, 10]} children="S" />
            <Word position={[10, 0, 0]} children="E" />
            <Word position={[-10, 0, 0]} children="W" />
            <TrackballControls />
        </>
    )
}