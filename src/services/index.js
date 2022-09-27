class ServiceRegistry {
  constructor() {
    this.timeout = 30;
    this.services = {};
  }

  register(serviceName, serviceVersion, serviceIP, servicePort) {
    this.cleanup();
    const key = serviceName + serviceVersion + serviceIP + servicePort;

    if (this.services[key]) {
      this.services[key].Timestamp = Math.floor(new Date() / 1000);
      console.log(`service exists, updated timestamp`);
      return key;
    }
    this.services[key] = {
      Name: serviceName,
      Version: serviceVersion,
      IP: serviceIP,
      PORT: servicePort,
      Timestamp: Math.floor(new Date() / 1000),
    };
    console.log(
      `new service added details: ${JSON.stringify(this.services[key])}`
    );
    return key;
  }

  unregister(serviceName, serviceVersion, serviceIP, servicePort) {
    const key = serviceName + serviceVersion + serviceIP + servicePort;

    if (this.services[key]) {
      delete this.services[key];
      console.log(`service exists, item deleted`);
      return key;
    }
    console.log(`service doesn't exist`);
    return key;
  }

  get(serviceName, serviceVersion) {
    const matchedServiceKey = Object.keys(this.services).find(
      (key) =>
        this.services[key].Name === serviceName &&
        this.services[key].Version === serviceVersion
    );

    return this.services[matchedServiceKey];
  }

  getAll() {
    return this.services;
  }

  cleanup() {
    Object.keys(this.services).forEach((key) =>
      this.services[key].timestamp + this.timeout > new Date() / 1000
        ? null
        : delete this.services[key]
    );
  }
}

export default ServiceRegistry;
