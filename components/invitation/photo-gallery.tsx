'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Camera } from 'lucide-react'
import { useState } from 'react'

// Nhân đôi mảng ảnh để tạo hiệu ứng vòng lặp vô tận (Loop)
const placeholderPhotos = [
	{
		id: 1,
		image: '/pic1.jpg',
		label: '',
		gradient: 'from-pink-100 via-pink-50 to-rose-100',
	},
	{
		id: 2,
		image: '/pic2.jpg',
		label: '',
		gradient: 'from-sky-100 via-blue-50 to-cyan-100',
	},
	{
		id: 3,
		image: '/pic3.jpg',
		label: '',
		gradient: 'from-yellow-100 via-amber-50 to-orange-100',
	},
	{
		id: 4,
		image: '/pic4.jpg',
		label: '',
		gradient: 'from-purple-100 via-violet-50 to-indigo-100',
	},
	{
		id: 5,
		image: '/pic5.jpg',
		label: '',
		gradient: 'from-emerald-100 via-green-50 to-teal-100',
	},
	{
		id: 6,
		image: '/pic6.jpg',
		label: '',
		gradient: 'from-pink-100 via-pink-50 to-rose-100',
	},
]

// Mảng nhân đôi
const extendedPhotos = [...placeholderPhotos, ...placeholderPhotos]

export function PhotoGallery() {
	const [hoveredId, setHoveredId] = useState<number | null>(null)

	// Tạm dừng trượt khi hover vào ảnh
	const isHovering = hoveredId !== null

	return (
		<section className='py-24 px-0 relative overflow-hidden z-20'>
			{/* Tiêu đề */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className='text-center mb-16 px-4'
			>
				<motion.div
					initial={{ scale: 0 }}
					whileInView={{ scale: 1 }}
					transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
					viewport={{ once: true }}
					className='inline-flex items-center gap-4 mb-4'
				>
					<div className='w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 shadow-lg'>
						<Camera className='w-7 h-7 text-sky-500' />
					</div>
					<h3 className='text-4xl font-black text-slate-700'>
						Khoảnh Khắc Đáng Yêu
					</h3>
				</motion.div>
				<p className='text-slate-500 text-lg'>
					Những hình ảnh đáng yêu nhất của bé
				</p>
			</motion.div>

			{/* Dải ảnh trượt vô tận (Marquee) */}
			<div className='relative w-full overflow-hidden py-10 flex'>
				<motion.div
					animate={{ x: isHovering ? '0%' : ['0%', '-50%'] }} // Nếu hover thì dừng, không thì trượt
					transition={{
						x: {
							repeat: Infinity,
							ease: 'linear',
							duration: 20, // Tốc độ trượt (số càng lớn trượt càng chậm)
						},
					}}
					className='flex gap-6 md:gap-10 w-max px-4'
				>
					{extendedPhotos.map((photo, index) => (
						<PhotoCard
							key={`${photo.id}-${index}`}
							photo={photo}
							index={index}
							isHovered={hoveredId === index}
							onHover={() => setHoveredId(index)}
							onLeave={() => setHoveredId(null)}
						/>
					))}
				</motion.div>
			</div>

		</section>
	)
}

interface PhotoCardProps {
	photo: (typeof placeholderPhotos)[0]
	index: number
	isHovered: boolean
	onHover: () => void
	onLeave: () => void
}

function PhotoCard({
	photo,
	index,
	isHovered,
	onHover,
	onLeave,
}: PhotoCardProps) {
	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const rotateX = useSpring(useTransform(y, [-50, 50], [15, -15]), {
		stiffness: 300,
		damping: 30,
	})
	const rotateY = useSpring(useTransform(x, [-50, 50], [-15, 15]), {
		stiffness: 300,
		damping: 30,
	})

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		x.set(e.clientX - (rect.left + rect.width / 2))
		y.set(e.clientY - (rect.top + rect.height / 2))
	}

	const handleMouseLeave = () => {
		x.set(0)
		y.set(0)
		onLeave()
	}

	return (
		<motion.div
			onMouseEnter={onHover}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX,
				rotateY,
				transformPerspective: 1000,
			}}
			className='flex-shrink-0 cursor-pointer'
		>
			<motion.div
				animate={{
					scale: isHovered ? 1.05 : 1,
					y: isHovered ? -15 : 0,
				}}
				className={`w-56 h-[320px] sm:w-64 sm:h-[360px] md:w-72 md:h-[400px] rounded-[2rem] bg-gradient-to-br ${photo.gradient} overflow-hidden relative group border-4 border-white`}
				style={{
					boxShadow: isHovered
						? '0 25px 50px -12px rgba(0,0,0,0.2), 0 0 30px rgba(135, 206, 235, 0.4)'
						: '0 10px 25px -5px rgba(0,0,0,0.1)',
				}}
			>
				<div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent z-10 pointer-events-none' />

				<div className='relative z-20 w-full h-full flex flex-col items-center justify-center p-6'>
					<motion.img
						src={photo.image}
						alt={photo.label}
						className='w-full h-full object-cover'
						animate={{
							scale: isHovered ? 1.1 : 1, // Di chuột vào ảnh sẽ zoom nhẹ lên
						}}
						transition={{ duration: 0.5 }}
					/>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: isHovered ? 1 : 0,
							y: isHovered ? 0 : 20,
						}}
						className='absolute bottom-6 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-white/50'
					>
						<p className='text-base font-bold text-slate-600'>{photo.label}</p>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	)
}
