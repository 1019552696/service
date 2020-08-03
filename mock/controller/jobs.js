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
      const { title = "", index = 1, count = 10 } = config.query;
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
  {
    url: "/v1/job/detail",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        data: mock({
          "data": [{
            head: {
              id: "@id",
              project_id: "@id",
              queue: "@string",
              sensitivity: "@integer",
              service_outcome_id: "@id",
              spider: "@string",
              update_at: "@datetime",
            },
            job: {
              id: "@string",
              object_id: "@id",
              status: "@integer",
              template_id: "@id",
              update_at: "@datetime",
              user_id: "@id"
            },
            object_store: {
              file_name: "@string",
              file_size: "@integer",
              full_path: "@string",
              id: "@id",
              line_count: "@integer",
              update_at: "@datetime",
              user_id: "@id"
            },
            project: {
              id: "@id",
              name: "@string",
              update_at: "@datetime"
            },
            "services|10": [{
              id: "@id",
              project_id: "@id",
              queue: "@string",
              sensitivity: "@integer",
              service_outcome_id: "@integer",
              spider: "string",
              update_at: "@datetime"
            }],
            "task_relations|10": [{
              expressions: "@string",
              id: "@id",
              next_task_id: "@id",
              task_id: "@id",
              template_id: "@id",
              update_at: "@datetime"
            }],
            "tasks|10": [{
              id: "@integer",
              service_id: "@integer",
              status: "@integer",
              template_id: "@integer",
              update_at: "@integer"
            }],
            template: {
              id: "@integer",
              project_id: "@integer",
              template_name: "@string",
              update_at: "@integer",
              user_id: "@integer"
            },
            user: {
              id: "@integer",
              name: "@string"
            }
          }, ],
        }).data,
      };
    }
  }
];
