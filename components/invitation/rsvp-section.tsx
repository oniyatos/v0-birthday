'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
	Send,
	User,
	Users,
	MessageCircleHeart,
	Sparkles,
	Loader2,
	X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Confetti from 'react-confetti'

export function RSVPSection() {
	const [formData, setFormData] = useState({
		name: '',
		guests: '',
		wishes: '',
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showPopup, setShowPopup] = useState(false)

	// THAY LINK FORM CỦA BẠN VÀO ĐÂY
	const GOOGLE_FORM_URL =
		'https://docs.google.com/forms/d/e/1FAIpQLSeUULcK2Fc2eYwxCZfra9OYrqdHOGCfdjWVqtaBLpfPPwOS3Q/formResponse?usp=sharing&ouid=107491553246260299800'

	// 3. Thay ID các câu hỏi (entry.xxxxxx) tương ứng
	const ENTRY_NAME = 'entry.861362752' // Đổi thành ID của câu Họ tên
	const ENTRY_GUESTS = 'entry.1219200551' // Đổi thành ID của câu Số người
	const ENTRY_WISHES = 'entry.2073743231' // Đổi thành ID của câu Lời chúc

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		const formBody = new URLSearchParams()
		formBody.append(ENTRY_NAME, formData.name)
		formBody.append(ENTRY_GUESTS, formData.guests)
		formBody.append(ENTRY_WISHES, formData.wishes)

		try {
			await fetch(GOOGLE_FORM_URL, {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: formBody.toString(),
			})
			setShowPopup(true)
			setFormData({ name: '', guests: '', wishes: '' })
		} catch (error) {
			console.error('Lỗi gửi form:', error)
			alert('Có lỗi xảy ra khi gửi, vui lòng thử lại nhé!')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className='py-24 px-4 relative overflow-hidden z-20'>
			{/* Tiêu đề */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className='text-center mb-12'
			>
				<div className='inline-flex items-center gap-3 mb-4'>
					<Sparkles className='w-6 h-6 text-sky-400' />
					<h3 className='text-4xl font-black text-slate-700'>
						Xác Nhận Tham Dự
					</h3>
					<Sparkles className='w-6 h-6 text-pink-400' />
				</div>
			</motion.div>

			{/* Form */}
			<motion.div
				initial={{ opacity: 0, y: 60 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, type: 'spring' }}
				viewport={{ once: true, margin: '-100px' }}
				className='glass-card rounded-[2.5rem] p-8 md:p-12 max-w-lg mx-auto relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl'
			>
				<form onSubmit={handleSubmit} className='space-y-6 relative z-10'>
					<p className='text-center mb-6 text-slate-500 font-medium'>
						Vui lòng điền thông tin để gia đình chuẩn bị chu đáo nhất nhé!
					</p>

					<div className='space-y-2'>
						<label className='text-sm font-bold flex items-center gap-2 text-slate-600'>
							<div className='w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center'>
								<User className='w-4 h-4 text-sky-500' />
							</div>
							Họ và tên
						</label>
						<Input
							type='text'
							required
							placeholder='Nhập họ tên của bạn'
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className='h-14 rounded-2xl bg-white/70 border-white focus:ring-sky-300 shadow-sm text-base'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-bold flex items-center gap-2 text-slate-600'>
							<div className='w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center'>
								<Users className='w-4 h-4 text-pink-500' />
							</div>
							Số người tham dự
						</label>
						<Input
							type='number'
							min='1'
							max='10'
							required
							placeholder='Ví dụ: 2'
							value={formData.guests}
							onChange={(e) =>
								setFormData({ ...formData, guests: e.target.value })
							}
							className='h-14 rounded-2xl bg-white/70 border-white focus:ring-pink-300 shadow-sm text-base'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-bold flex items-center gap-2 text-slate-600'>
							<div className='w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center'>
								<MessageCircleHeart className='w-4 h-4 text-yellow-500' />
							</div>
							Lời chúc cho bé
						</label>
						<textarea
							required
							rows={3}
							placeholder='Gửi ngàn lời chúc tốt đẹp nhất...'
							value={formData.wishes}
							onChange={(e) =>
								setFormData({ ...formData, wishes: e.target.value })
							}
							className='w-full rounded-2xl p-4 bg-white/70 border border-white focus:ring-2 focus:ring-yellow-300 shadow-sm text-base outline-none resize-none'
						/>
					</div>

					<Button
						type='submit'
						disabled={isSubmitting}
						className='w-full h-16 rounded-2xl text-lg font-bold text-white shadow-xl bg-gradient-to-r from-sky-400 via-pink-400 to-yellow-400 hover:scale-[1.02] transition-transform'
					>
						{isSubmitting ? (
							<Loader2 className='w-6 h-6 animate-spin' />
						) : (
							<span className='flex items-center gap-2'>
								<Send className='w-5 h-5' /> Gửi Lời Chúc
							</span>
						)}
					</Button>
				</form>
			</motion.div>

			{/* ĐÃ FIX: POPUP CUTE PHÔ MAI QUE */}
			<AnimatePresence>
				{showPopup && (
					<div className='fixed inset-0 z-[100] flex items-center justify-center px-4'>
						{/* Nền làm mờ */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setShowPopup(false)}
							className='absolute inset-0 bg-slate-900/30 backdrop-blur-sm cursor-pointer'
						/>

						<div className='pointer-events-none absolute inset-0 z-50'>
							<Confetti
								width={window.innerWidth}
								height={window.innerHeight}
								recycle={false}
								numberOfPieces={300}
								colors={['#FFB6C1', '#87CEEB', '#FFF9C4', '#E6E6FA']}
							/>
						</div>

						{/* Thẻ Popup */}
						<motion.div
							initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
							animate={{ opacity: 1, scale: 1, rotate: 0 }}
							exit={{ opacity: 0, scale: 0.8, y: 20 }}
							transition={{ type: 'spring', damping: 15, stiffness: 200 }}
							className='relative bg-gradient-to-b from-white to-pink-50 rounded-[3rem] p-8 md:p-12 max-w-sm w-full text-center shadow-[0_20px_60px_rgba(255,182,193,0.4)] border-4 border-white z-50'
						>
							{/* Nút X bé xinh */}
							<button
								title='ok'
								onClick={() => setShowPopup(false)}
								className='absolute top-5 right-5 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-slate-400 hover:text-pink-500 hover:bg-pink-100 transition-colors shadow-sm'
							>
								<X className='w-4 h-4' />
							</button>

							{/* Icon thay cho dấu Tick xanh */}
							<div className='w-24 h-24 bg-gradient-to-tr from-pink-200 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-200/50 animate-bounce border-4 border-white'>
								<span className='text-5xl'>💌</span>
							</div>

							<h2
								className='text-4xl font-black text-pink-400 mb-3'
								style={{ fontFamily: 'var(--font-cursive)' }}
							>
								Thành Công!
							</h2>
							<p className='text-slate-500 text-base leading-relaxed mb-8 font-medium'>
								Bé và gia đình đã nhận được lời chúc siêu dễ thương của bạn. Hẹn
								gặp bạn tại buổi tiệc nha! 🎉
							</p>

							{/* Nút đóng */}
							<Button
								onClick={() => setShowPopup(false)}
								className='w-full h-14 rounded-full bg-gradient-to-r from-pink-400 to-yellow-400 hover:from-pink-500 hover:to-yellow-500 text-white font-bold text-lg shadow-lg shadow-pink-300 hover:scale-105 transition-all border-0'
							>
								Tuyệt vời 💖
							</Button>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</section>
	)
}
