'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Navigation, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EventDetailsProps {
	date: string
	time: string
	venue: string
	address: string
	mapsUrl: string
}

export function EventDetails({
	date,
	time,
	venue,
	address,
	mapsUrl,
}: EventDetailsProps) {
	return (
		<section className='py-20 px-4 relative z-20'>
			{/* Tiêu đề */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className='text-center mb-12'
			>
				<div className='inline-flex items-center gap-3 mb-4'>
					<Sparkles className='w-5 h-5 text-sky-400' />
					<h3 className='text-4xl font-black text-slate-700 tracking-tight'>
						Chi Tiết Sự Kiện
					</h3>
					<Sparkles className='w-5 h-5 text-pink-400' />
				</div>
			</motion.div>

			{/* Grid 2 Cột */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto perspective-[1000px]'>
				{/* THẺ THỜI GIAN - TILT 3D */}
				<motion.div
					initial={{ opacity: 0, x: -50, rotateY: 20 }}
					whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
					transition={{ duration: 0.8, type: 'spring' }}
					viewport={{ once: true, margin: '-50px' }}
					whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, zIndex: 30 }}
					className='glass-card rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl border border-white/50 cursor-pointer'
				>
					<div className='absolute -top-20 -right-20 w-48 h-48 bg-sky-200/50 rounded-full blur-3xl group-hover:bg-sky-300/50 transition-colors' />

					<div className='relative z-10'>
						<div className='flex items-center gap-4 mb-8'>
							<div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform'>
								<Calendar className='w-8 h-8 text-sky-500' />
							</div>
							<h4 className='text-2xl font-bold text-slate-700'>Thời Gian</h4>
						</div>

						<div className='space-y-4'>
							<div className='rounded-2xl p-6 text-center bg-white/60 shadow-sm border border-white group-hover:shadow-md transition-shadow'>
								<p className='text-4xl font-black text-sky-500 mb-2'>
									{date.split(',')[0]}
								</p>
								<p className='text-slate-500 font-medium'>
									{date.split(',')[1]?.trim()}
								</p>
							</div>

							<div className='flex items-center gap-4 rounded-2xl p-5 bg-white/60 border border-white shadow-sm'>
								<div className='w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center'>
									<Clock className='w-6 h-6 text-sky-500' />
								</div>
								<div>
									<p className='text-sm text-slate-400 font-medium'>
										Bắt đầu lúc
									</p>
									<p className='font-bold text-xl text-slate-700'>{time}</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* THẺ ĐỊA ĐIỂM - TILT 3D */}
				<motion.div
					initial={{ opacity: 0, x: 50, rotateY: -20 }}
					whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
					transition={{ duration: 0.8, type: 'spring' }}
					viewport={{ once: true, margin: '-50px' }}
					whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5, zIndex: 30 }}
					className='glass-card rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl border border-white/50 cursor-pointer'
				>
					<div className='absolute -top-20 -left-20 w-48 h-48 bg-pink-200/50 rounded-full blur-3xl group-hover:bg-pink-300/50 transition-colors' />

					<div className='relative z-10'>
						<div className='flex items-center gap-4 mb-8'>
							<div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform'>
								<MapPin className='w-8 h-8 text-pink-500' />
							</div>
							<h4 className='text-2xl font-bold text-slate-700'>Địa Điểm</h4>
						</div>

						<div className='space-y-4 h-full flex flex-col justify-between'>
							<div className='rounded-2xl p-6 bg-white/60 shadow-sm border border-white flex-1'>
								<p className='font-bold text-xl mb-3 text-pink-600'>{venue}</p>
								<p className='text-slate-500 leading-relaxed font-medium'>
									{address}
								</p>
							</div>

							<Button
								asChild
								className='w-full h-22 rounded-2xl text-base font-bold text-white border-0 shadow-[0_8px_30px_rgba(236,72,153,0.3)] bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 transition-all hover:scale-[1.02]'
							>
								<a href={mapsUrl} target='_blank' rel='noopener noreferrer'>
									<Navigation className='w-5 h-5 mr-2 animate-bounce' />
									Xem trên Google Maps
								</a>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
