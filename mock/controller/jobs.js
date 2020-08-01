import { mock } from "mockjs";
const List = [];
const countSum = 100;
for (let i = 0; i < countSum; i++) {
  List.push(
    mock({
      id: "@string",
      object_id: "@id",
      status: "@integer",
      template_id: "@id",
      update_at: "@datetime",
      user_id: "@id",
    })
  );
}

export default [{
    url: "/v1/job",
    type: "get",
    response: (config) => {
      if (!config.body) {
        return {
          code: 200,
          msg: "success",
          totalCount: countSum,
          data: mock({
            "data|50": [{
              id: "@string",
              object_id: "@id",
              status: "@integer",
              template_id: "@id",
              update_at: "@datetime",
              user_id: "@id",
            }, ],
          }).data,
        };
      }
      const { title = "", index = 1, count = 20 } = config.query;
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });
      const pageList = mockList.filter(
        (item, itemIndex) =>
        itemIndex < count * index && itemIndex >= count * (index - 1)
      );
      return {
        code: 200,
        msg: "success",
        total: countSum,
        data: pageList,
      };
    },
  },
  {
    url: "/v1/job",
    type: "put",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/v1/job",
    type: "delete",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
