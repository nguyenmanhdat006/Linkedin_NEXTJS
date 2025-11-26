import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Pencil, Plus } from 'lucide-react'
import { ProfileData, Experience } from '@/types/profile'

export function ExperienceSection({ experiences }: { experiences?: Experience[] }) {
	return (
		<Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
			<CardContent className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-900">Kinh nghiệm</h2>
					<div className="flex gap-1">
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
							<Plus className="h-6 w-6 text-gray-600" />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
							<Pencil className="h-5 w-5 text-gray-600" />
						</Button>
					</div>
				</div>

				{experiences && experiences.length > 0 ? (
					experiences.map((exp) => (
						<div key={exp.id} className="flex gap-4 mb-4 last:mb-0">
							<div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center shrink-0 border border-gray-200">
								<Briefcase className="w-6 h-6 text-gray-500" />
							</div>
							<div className="border-b border-gray-200 flex-1 pb-4 last:border-0">
								<h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
								<p className="text-sm text-gray-900">{exp.company}</p>
								<p className="text-sm text-gray-500 mt-0.5">{new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? 'Hiện tại' : new Date(exp.endDate || '').getFullYear()}</p>
								<p className="text-sm text-gray-700 mt-2">{exp.description}</p>
							</div>
						</div>
					))
				) : (
					<div className="mt-1">
						<p className="text-sm text-gray-500 mb-6">Giới thiệu thành tích của bạn và nhận được số lượt xem hồ sơ và kết nối gấp 2 lần.</p>
						<div className="flex gap-4 mb-6 opacity-40 select-none pointer-events-none">
							<div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center shrink-0 border border-gray-300">
								<Briefcase className="w-6 h-6 text-gray-400" />
							</div>
							<div className="flex-1">
								<div className="text-base font-bold text-gray-400">Chức danh</div>
								<div className="text-sm text-gray-400">Tổ chức</div>
								<div className="text-sm text-gray-400 mt-0.5">2023 - nay</div>
							</div>
						</div>
						<Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-5 h-9">Thêm kinh nghiệm</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
