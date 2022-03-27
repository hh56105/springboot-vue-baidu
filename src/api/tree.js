import http from '@/utils/http'

export function getTree() {
  return http.axiosGet(`/vc/api/service/codeGate/treeqx`)
}
