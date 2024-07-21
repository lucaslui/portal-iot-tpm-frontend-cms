export type CourseModel = {
    id: string;
    title: string;
    description: string;
    type: string;
    observation: string;
    imageUrl: string;
    landingPageUrl: string;
    registrationPeriod: {
        startDate: Date;
        endDate: Date;
    },
    classPeriod: {
        startDate?: Date;
        endDate?: Date;
        dates: Date[];
    },
    classSchedules: {
        weekDay: string;
        startTime: string;
        endTime: string;
    },
    updatedAt: Date;
    createdAt: Date;
}