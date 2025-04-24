import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { userExist } from "../middlewares/existUser.middleware.js";
import { UserResponseDto } from "../dto/userResponse.dto.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userDao.getAll();
    const usersDto = users.map(u => new UserResponseDto(u));
    res.status(200).json({ status: "ok", users: usersDto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userDao.create(req.body);
    res.status(201).json({ status: "ok", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/:id", userExist, async (req, res) => {
  try {
    const user = await userDao.getOne({_id: req.params.id})
    const userDto = new UserResponseDto(user);
    res.status(200).json({ status: "ok", user: userDto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete("/:id", userExist, async (req, res) => {
  try {
    await userDao.remove(req.params.id);
    res.status(200).json({ status: "ok", message: `User id ${req.params.id} remove` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

import { hashPassword } from "../utils/hasPassword.js";

router.put("/:id", userExist, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = hashPassword(updateData.password);
    }
    const userUpdate = await userDao.update(req.params.id, updateData);
    const userDto = new UserResponseDto(userUpdate);
    res.status(200).json({ status: "ok", user: userDto });
  } catch (error) {
    console.error("[PUT /users/:id] Error actualizando usuario:", error);
    res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
  }
});

export default router;
