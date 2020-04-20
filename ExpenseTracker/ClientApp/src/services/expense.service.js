import http from "../http-common";

class ExpenseDataService {
  getAll() {
    return http.get("/ExpenseItems");
  }

  get(id) {
    return http.get(`/ExpenseItems/${id}`);
  }

  create(data) {
    return http.post("/ExpenseItems", data, {
      headers: {
        'content-type': 'application/json',
      }
    });
  }

  update(id, data) {
    return http.put(`/ExpenseItems/${id}`, data);
  }

  delete(id) {
    return http.delete(`/ExpenseItems/${id}`);
  }
}

export default new ExpenseDataService();