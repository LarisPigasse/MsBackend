import Account from '../models/Account.js';


export const getAccountFilter = async (req, res) => {

}


export const updatePassword = async (req, res) => {

}


// Funzione per creare un nuovo account
export const createAccount = async (req, res) => {
  try {
    const { account, email, password, tipo_account, ultimo_login, uuid_account } = req.body;

    const newAccount = await Account.create({
      account,
      email,
      password,
      tipo_account,
      ultimo_login,
      uuid_account
    });

    res.status(201).json({ success: true, data: newAccount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Funzione per ottenere tutti gli account
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();

    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Funzione per ottenere un singolo account
export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    res.status(200).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Funzione per aggiornare un account
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { account, email, password, tipo_account, ultimo_login, uuid_account } = req.body;

    const accountToUpdate = await Account.findByPk(id);

    if (!accountToUpdate) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    await accountToUpdate.update({
      account,
      email,
      password,
      tipo_account,
      ultimo_login,
      uuid_account
    });

    res.status(200).json({ success: true, data: accountToUpdate });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Funzione per eliminare un account
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const accountToDelete = await Account.findByPk(id);

    if (!accountToDelete) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }

    await accountToDelete.destroy();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
