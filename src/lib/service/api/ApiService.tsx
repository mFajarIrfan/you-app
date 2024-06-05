class ApiService {
  saveData(data: any) {
    const currentTime = new Date().getTime();
    const expiresAt = currentTime + 60 * 60 * 1000;
    const dataToStore = { ...data, expiresAt };
    localStorage.setItem("data", JSON.stringify(dataToStore));
  }

  getData() {
    const data = localStorage.getItem("data");
    let result = "";
    if (data) {
      const { access_token, expiresAt } = JSON.parse(data);
      if (expiresAt && new Date().getTime() < expiresAt) {
        result = access_token;
      } else {
        this.logout();
      }
    }
    return result;
  }

  isAuthenticated() {
    return !!this.getData();
  }

  getRemainingTime() {
    const data = localStorage.getItem("data");
    if (data) {
      const { expiresAt } = JSON.parse(data);
      return expiresAt - new Date().getTime();
    }
    return 0;
  }

  getRoleCode() {
    const data = localStorage.getItem("data");
    let result = "";
    if (data) {
      result = JSON.parse(data).roleCode;
    }
    return result;
  }

  getUserId() {
    const data = localStorage.getItem("data");
    let result = 0;
    if (data) {
      result = JSON.parse(data).id;
    }
    return result;
  }

  logout() {
    localStorage.clear();
  }
}

export default new ApiService();
