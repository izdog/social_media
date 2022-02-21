/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

const catchErrors = (fn) => {
    return function (req, res, next) {
        const resp = fn(req, res, next);
        if (resp instanceof Promise) {
            return resp.catch(next);
        }
        return resp;
    };
};

const notFound = (req, res, next) => {
    return res.status(404).json({
        success: false,
        message: "Api url doesn't exist"
    })
}

export default {catchErrors, notFound }