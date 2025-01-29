
function catchAsyncError(passedFunction) {
    return function (req, res, next) {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
}
export default catchAsyncError;