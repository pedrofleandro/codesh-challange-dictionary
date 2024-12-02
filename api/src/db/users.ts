import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type: String, requires: true},
  email: {type: String, required: true},
  authentication: {
    password: { type: String, required: true, select: false},
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false}
  },
  history: [
    {
        term: { type: String, required: true },
        accessedAt: { type: Date, default: Date.now },
    },
  ],
  favorites: [{ type: String }],
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email:string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.find({
  'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id});
export const updateUsersById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const createNewUser = async (values: Record<string, any>) => {
  const user = new UserModel(values);
  return await user.save(); 
};

// Métodos Específicos para Histórico
export const addToHistory = async (userId: string, term: string) => {
  console.log(userId)
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('Usuário não encontrado');

  // Verifica se o termo já está no histórico
  const alreadyInHistory = user.history.some((item) => item.term === term);

  if (!alreadyInHistory) {
    user.history.push({ term });
    await user.save();
  }
  return user;
};

export const getUserHistory = (userId: string) =>
  UserModel.findById(userId).select('history');

// Métodos Específicos para Favoritos
export const addToFavorites = async (userId: string, term: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('Usuário não encontrado');

  if (!user.favorites.includes(term)) {
    user.favorites.push(term);
    await user.save();
  }
  return user;
};

export const removeFromFavorites = async (userId: string, term: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('Usuário não encontrado');

  user.favorites = user.favorites.filter((favorite) => favorite !== term);
  await user.save();

  return user;
};

export const getUserFavorites = (userId: string) =>
  UserModel.findById(userId).select('favorites');