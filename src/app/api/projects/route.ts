import { NextResponse } from 'next/server';

import { APIResponse } from '@/types/api';
import { Project } from '@/types/project';
import { API_STATUS } from '@/constants/status';
import { mockProjects } from '@/container/pages/projects/data/mockProjects';

export async function GET() {
  try {
    // TODO: Notion API에서 데이터 가져오기
    // 현재는 mock 데이터를 반환
    const data: Project[] = mockProjects;

    const responseData: APIResponse<Project[]> = {
      code: 200,
      data,
      status: API_STATUS.SUCCESS
    };

    return NextResponse.json(responseData, { status: responseData.code });
  } catch (error) {
    console.error('Error fetching projects data:', error);

    const responseData: APIResponse<null> = {
      data: null,
      code: 500,
      status: API_STATUS.ERROR,
      message: 'Failed to fetch projects data'
    };
    return NextResponse.json(responseData, { status: responseData.code });
  }
}
