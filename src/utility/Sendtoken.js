

export async function sendToken (res, user, message, statuscode) {

    console.log(user)
    const token = await user.getJwtToken();
    // const token = "1234r"
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 15),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    res.status(200).cookie("token", token, options).json({
        message: message,
        user: user,
        status: statuscode
    })

}