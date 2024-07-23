export type CourseModel = {
    id: string;
    title: string;
    description: string;
    type: string;
    observation: string;
    imageUrl: string;
    landingPageUrl: string;
    price: {
        normal: string;
        discount?: string;
        until?: string;
    },
    registrationPeriod: {
        startDate: string;
        endDate: string;
    },
    classPeriod: {
        startDate?: string;
        endDate?: string;
        dates?: string[];
    },
    classSchedules: {
        weekDay: string;
        startTime: string;
        endTime: string;
    },
    updatedAt: string;
    createdAt: string;
}