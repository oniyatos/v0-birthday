'use client'

import {
	motion,
	useScroll,
	useTransform,
	useMotionValue,
	useSpring,
} from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'
import { useRef } from 'react'

interface HeroSectionProps {
	babyName: string
	eventDate: string
}

export function HeroSection({ babyName, eventDate }: HeroSectionProps) {
	const ref = useRef<HTMLElement>(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	})

	const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)
	const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
	const rotateX = useSpring(
		useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']),
		springConfig,
	)
	const rotateY = useSpring(
		useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']),
		springConfig,
	)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
		mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
	}
	const handleMouseLeave = () => {
		mouseX.set(0)
		mouseY.set(0)
	}

	return (
		<section
			ref={ref}
			className='min-h-[100svh] flex flex-col items-center justify-center px-4 pt-10 pb-32 mb-10 relative perspective-[2000px] z-20'
		>
			<motion.div
				style={{ y, opacity, rotateX, rotateY, transformStyle: 'preserve-3d' }}
				className='w-full max-w-md mx-auto z-20 mt-auto'
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<motion.div
					initial={{ opacity: 0, y: 50, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
					className='glass-card rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-white/40 bg-white/40 backdrop-blur-xl group'
					style={{ transform: 'translateZ(50px)' }}
				>
					<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/30 to-transparent' />

					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className='flex items-center justify-center gap-3 mb-6'
						style={{ transform: 'translateZ(30px)' }}
					>
						<Sparkles className='w-5 h-5 text-yellow-400 animate-pulse' />
						<p className='text-sm tracking-[0.3em] uppercase font-bold text-slate-500'>
							Welcome to my
						</p>
						<Sparkles className='w-5 h-5 text-yellow-400 animate-pulse' />
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
						className='mb-8'
						style={{ transform: 'translateZ(60px)' }}
					>
						<h1 className='text-5xl md:text-6xl font-black gradient-text tracking-tight pb-2'>
							1st Birthday
						</h1>
						<div className='h-1 w-24 mx-auto mt-2 rounded-full bg-gradient-to-r from-sky-300 via-pink-300 to-yellow-200' />
					</motion.div>

					{/* KHUNG AVATAR KÈM NGÔI SAO */}
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.5, duration: 1, type: 'spring' }}
						className='relative mx-auto mb-10 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center'
						style={{ transform: 'translateZ(90px)' }}
					>
						{/* SAO XOAY NGOÀI CÙNG - Đã bọc div để giữ khoảng cách */}
						<div className='absolute inset-0 pointer-events-none z-0'>
							{[0, 72, 144, 216, 288].map((startDegree, i) => (
								<motion.div
									key={i}
									className='absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center'
									animate={{ rotate: [startDegree, startDegree + 360] }}
									transition={{
										duration: 12,
										repeat: Infinity,
										ease: 'linear',
									}}
								>
									<div style={{ transform: 'translateY(-110px)' }}>
										<motion.span
											className='block text-4xl drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]'
											animate={{
												scale: [0.6, 0.8, 0.6],
												opacity: [0.6, 1, 0.6],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												delay: i * 0.5,
											}}
										>
											✨
										</motion.span>
									</div>
								</motion.div>
							))}
						</div>

						{/* Vòng Glow nền */}
						<div className='absolute -inset-4 rounded-full bg-gradient-to-tr from-sky-300 via-pink-300 to-yellow-200 opacity-40 blur-xl animate-pulse z-10' />

						{/* Ảnh bé z-20 đè lên sao nếu lướt qua */}
						<div className='absolute inset-0 rounded-full border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden bg-white flex items-center justify-center z-20'>
							<motion.img
								src='/avatar.jpg'
								alt='Avatar'
								className='w-full h-full object-cover'
								animate={{ scale: [1, 1.05, 1] }}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
							/>
						</div>
					</motion.div>

					<motion.div style={{ transform: 'translateZ(40px)' }}>
						<h2
							className='text-5xl md:text-5xl gradient-text mb-2 font-bold'
							style={{ fontFamily: 'var(--font-cursive)' }}
						>
							{babyName}
						</h2>
						<p className='text-lg mb-6 font-medium text-slate-500'>
							Tiệc Thôi Nôi
						</p>

						<div className='inline-flex items-center gap-3 rounded-full px-5 py-3 font-medium bg-white/70 shadow-lg border border-white/50 text-slate-600 backdrop-blur-md'>
							<span className='text-xl animate-bounce'>📅</span>
							<span className='text-sm md:text-base'>{eventDate}</span>
						</div>
					</motion.div>
				</motion.div>
			</motion.div>

			{/* CHỈ BÁO CUỘN TRANG NẰM Ở DƯỚI CÙNG */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1.5, duration: 0.8 }}
				className='absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none mt-auto'
			>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					className='w-10 h-10 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-md shadow-md border border-white/50'
				>
					<ChevronDown className='w-5 h-5 text-sky-500' />
				</motion.div>
			</motion.div>
		</section>
	)
}
