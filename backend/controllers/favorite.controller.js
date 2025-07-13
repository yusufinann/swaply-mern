import { Item } from '../models/item.model.js';
import { User } from '../models/user.model.js';

export const addFavorites=async(req,res)=>{
    try {
        const userId=req.user._id;
        const{itemId}=req.params;

        const user=await User.findById(userId);
             if (!user) {
            return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
        }
     
        const item=await Item.findById(itemId);
         if (!item) {
            return res.status(404).json({ success: false, message: 'Ürün bulunamadı.' });
        }

        if(user.favorites.includes(itemId)){
                return res.status(400).json({ success: false, message: 'Ürün zaten favorilerinizde.' });
        }
        user.favorites.push(itemId);
        await user.save();
         res.status(200).json({
            success: true,
            message: 'Ürün favorilere eklendi.',
            favorites: user.favorites // Güncel favori listesini dönebilirsiniz
        });
    } catch (error) {
        console.error("Favori ekleme hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu hatası.', error: error.message });
    }

}

export const removeFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
        }

        // Mongoose's .pull() method removes all instances of a value from an array.
        user.favorites.pull(itemId);
        await user.save();

        // **THE FIX IS HERE:**
        // The response object now uses 'success: true' and a consistent message key.
        res.status(200).json({
            success: true,
            message: "Ürün favorilerden çıkarıldı.",
            favorites: user.favorites // Return the updated list of favorite IDs
        });
    } catch (error) {
        console.error("Favori çıkarma hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu hatası.', error: error.message });
    }
}
export const getMyFavorites=async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate({
          path: 'favorites',
          model: 'Item' // Item modelinizin adı
          // İsterseniz select ile sadece belirli alanları getirebilirsiniz
          // select: 'title images price'
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
        }

        res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
        console.error("Favorileri getirme hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu hatası.', error: error.message });
    }
}