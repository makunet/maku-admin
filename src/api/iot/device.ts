import service from "@/utils/request";

export const useIot_deviceApi = (id: number) => {
  return service.get("/iot/device/" + id);
};

export const useIot_deviceSubmitApi = (dataForm: any) => {
  if (dataForm.id) {
    return service.put("/iot/device", dataForm);
  } else {
    return service.post("/iot/device", dataForm);
  }
};

// 发送指令，等待设备回复
export const useIot_deviceSyncSendCommandApi = (dataForm: any) => {
  return service.post("/iot/device/syncSendCommand", dataForm);
};
// 发送指令，等待设备回复，调试模式
export const useIot_deviceSyncSendCommandDebugApi = (dataForm: any) => {
  return service.post("/iot/device/syncSendCommand/debug", dataForm);
};

// 发送指令，不等待设备回复
export const useIot_deviceAsyncSendCommandApi = (dataForm: any) => {
  return service.post("/iot/device/asyncSendCommand", dataForm);
};

//模拟设备属性数据上报
export const useIot_deviceSimulateDeviceReportAttributeDataApi = (dataForm: any) => {
  return service.post("/iot/device/simulateDeviceReportAttributeData", dataForm);
};
