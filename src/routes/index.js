import { Router } from "express";
import requestIp from "request-ip";

import ServiceRegistry from "../services/index";

const routes = Router();
const serviceRegistry = new ServiceRegistry();

routes.put(
  "/register/:serviceName/:serviceVersion/:servicePort",
  (req, res) => {
    const { serviceName, serviceVersion, servicePort } = req.params;

    const serviceip = requestIp.getClientIp(req);
    const serviceIP = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    console.log(serviceip , serviceIP)
    const key = serviceRegistry.register(
      serviceName,
      serviceVersion,
      serviceIP,
      servicePort
    );

    res.json({
      message: "service registered",
      data: { ...req.params, serviceIP },
      key,
    });
  }
);

routes.delete(
  "/delete/:serviceName/:serviceVersion/:servicePort",
  (req, res) => {
    const { serviceName, serviceVersion, servicePort } = req.params;

    const serviceIP = requestIp.getClientIp(req);

    const key = serviceRegistry.unregister(
      serviceName,
      serviceVersion,
      serviceIP,
      servicePort
    );

    res.json({
      message: "service unregistered",
      data: { ...req.params, serviceIP },
      key,
    });
  }
);

routes.get("/get/:serviceName/:serviceVersion", (req, res) => {
  const { serviceName, serviceVersion } = req.params;

  const data = serviceRegistry.get(serviceName, serviceVersion);

  res.json({
    message: "we got your data",
    data: data,
  });
});

routes.get("/get-all", (req, res) => {
  const data = serviceRegistry.getAll();

  res.json({
    message: "we got your data",
    data: data,
  });
});



export default routes;
