import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/v1/job",
    method: "get",
    params: {
      index: data.index,
      count: data.count,
    },
  });
}

export function doEdit(data) {
  return request({
    url: "/v1/job",
    method: "put",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/v1/job",
    method: "delete",
    data,
  });
}

export function getDetail(data) {
  return request({
    url: "/v1/job/detail",
    method: "post",
    params: {
      id: data.id,
    },
  });
}
