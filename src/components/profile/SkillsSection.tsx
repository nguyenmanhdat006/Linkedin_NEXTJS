import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skill } from '@/types/profile'

export function SkillsSection({ skills }: { skills?: Skill[] }) {
	return (
		<Card className="rounded-xl border border-gray-300 shadow-sm bg-white">
			<CardContent className="p-6 relative">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-900">Kỹ năng</h2>
					<div className="flex gap-1">
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
							<Plus className="h-6 w-6 text-gray-600" />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-10 w-10">
							<Pencil className="h-5 w-5 text-gray-600" />
						</Button>
					</div>
				</div>

				{skills && skills.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{skills.map((skill) => (
							<Badge key={skill.id} variant="secondary" className="px-3 py-1.5 text-sm font-medium border-gray-300 hover:bg-gray-200 cursor-pointer">{skill.name} ({skill.endorsementCount})</Badge>
						))}
					</div>
				) : (
					<div>
						<p className="text-sm text-gray-700 mb-4 pr-6">Truyền đạt sự phù hợp của bạn với các cơ hội mới - 50% nhà tuyển dụng sử dụng dữ liệu kỹ năng để hoàn thành vai trò của họ</p>
						<div className="flex flex-col gap-2 mb-5">
							<div className="text-sm text-gray-400 font-medium border-b border-gray-100 pb-2">Kỹ năng mềm</div>
							<div className="text-sm text-gray-400 font-medium pb-1">Kỹ năng kỹ thuật</div>
						</div>
						<Button variant="outline" className="rounded-full border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-800 border-[1.5px] px-6 h-9">Thêm kỹ năng</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
