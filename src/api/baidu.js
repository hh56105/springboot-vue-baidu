import http from '@/utils/http'

export function getGateGroup() {
  return http.axiosGet(`/vc/api/service/codeGate/queryListOfCity`)
}

export function getGateList() {
  return http.axiosGet(`/vc/api/service/codeGate/gateList`)
}
