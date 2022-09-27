class UserService {
  constructor(axios) {
    this.axios = axios;
    this.url = `http://localhost:7000/services`;
  }
  async getService(service) {
    return await this.axios
      .get(`${this.url}/get/${service}`)
      .catch((error) => console.log(error));
  }
  async callService(method, path, service, payload = {}) {
    return await this.axios[`${method}`](
      `http://${service.IP}:${service.PORT}/${path}`,
      payload
    ).catch((error) => console.log(error));
  }
  async getAllUsers() {
    const service = await this.getService(`user-service/1.0.0`);
    if (service) {
      return await this.callService(
        "get",
        "users/all-users",
        service?.data?.data
      );
    } else {
      return;
    }
  }
  async getUser(userID) {
    const service = await this.getService(`user-service/1.0.0`);
    if (service) {
      return await this.callService(
        "get",
        `users/user/${userID}`,
        service.data.data
      );
    }
    return;
  }

  async addUser(payload) {
    const service = await this.getService(`user-service/1.0.0`);
    if (service) {
      return await this.callService(
        "post",
        `users/user/`,
        service.data.data,
        payload
      );
    }
    return;
  }
  async deleteUser(userID) {
    const service = await this.getService(`user-service/1.0.0`);
    if (service) {
      return await this.callService(
        "delete",
        `users/delete/${userID}`,
        service.data.data
      );
    }
    return;
  }
}

export default UserService;
