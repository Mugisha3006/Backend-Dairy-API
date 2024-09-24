import { StatusCodes } from "http-status-codes";

const isAdmin = (req, res, next) => {
	if (req.tokenData.role === "ADMIN") {
		next();
	} else {
		res.status(StatusCodes.FORBIDDEN).json({ error: "Access Denied" });
	}
};

const isCustomer = (req, res, next) => {
	if (req.tokenData.role === "CUSTOMER") {
		next();
	} else {
		res.status(StatusCodes.FORBIDDEN).json({ error: "Access Denied" });
	}
};

const isVendor = (req, res, next) => {
    if (req.tokenData.role === "VENDOR") {
        next();
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ error: "Access Denied" });
    }
};

export { isAdmin, isCustomer };