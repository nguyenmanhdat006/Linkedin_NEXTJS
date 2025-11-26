import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil } from 'lucide-react'
import { Education } from '@/types/profile'

export function EducationSection({ educations }: { educations?: Education[] }) {
	const getYear = (dateString?: string | null) => {
		if (!dateString) return 'Nay'
		return new Date(dateString).getFullYear()
	}

	return (
		<Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
			<CardContent className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-900">Trình độ học vấn</h2>
					<div className="flex gap-1">
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
							<Plus className="h-6 w-6 text-gray-600" />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
							<Pencil className="h-5 w-5 text-gray-600" />
						</Button>
					</div>
				</div>

				{educations && educations.length > 0 ? (
					educations.map((edu) => (
						<div key={edu.id} className="flex gap-4 mb-4 last:mb-0 group">
							<div className="h-12 w-12 bg-blue-50 rounded-md shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
								<div className="text-[10px] font-bold text-blue-800 uppercase">{edu.school.substring(0,3)}</div>
							</div>
							<div className="border-b border-gray-200 flex-1 pb-4 last:border-0">
								<h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 group-hover:underline cursor-pointer">{edu.school}</h3>
								<p className="text-sm text-gray-900">{edu.degree}, {edu.fieldOfStudy}</p>
								<p className="text-sm text-gray-500 mt-0.5">{getYear(edu.startDate)} - {getYear(edu.endDate)}</p>
							</div>
						</div>
					))
				) : (
					<div className="mt-1">
						<p className="text-sm text-gray-500 mb-6">Thêm thông tin trường học để tăng độ uy tín cho hồ sơ của bạn.</p>
						<div className="flex gap-4 mb-6 opacity-40 select-none pointer-events-none">
							<div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center shrink-0 border border-gray-300">
								<div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
							</div>
							<div className="flex-1">
								<div className="text-base font-bold text-gray-400">Trường học</div>
								<div className="text-sm text-gray-400 mt-0.5">2024 - 2028</div>
							</div>
						</div>
						<Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-5 h-9">Thêm trình độ học vấn</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
