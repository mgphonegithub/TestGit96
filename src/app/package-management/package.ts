export interface packageDetail {
    groupCode: string;
    groupName: string;
    descriptionEn: string;
    descriptionMm?: any;
    groupType: string;
    createdTime: string;
    updatedTime: string;
    orderId: number;
    status: string;
}

export interface formSend {
    descriptionEn: string;
    descriptionMm: string;
    orderId: number;
    groupName: string;
    groupCode: string;
    groupType: string;
    status: string;

}




