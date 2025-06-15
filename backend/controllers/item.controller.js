import { Item } from '../models/item.model.js';
import mongoose from 'mongoose';

export const createItem = async (req, res) => {
  try {
    const { title, description, images, category, location, tags } = req.body;
    const owner = req.user._id;

    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Başlık ve kategori alanları zorunludur.' });
    }

    const newItem = new Item({
      title,
      description,
      images: images || [],
      category,
      owner,
      location,
      tags: tags || [],
      status: 'Available',
    });

    const savedItem = await newItem.save();
    res.status(201).json({ success: true, data: savedItem });

  } catch (error) {
    console.error('Create Item Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Sunucu hatası. Ürün oluşturulamadı.' });
  }
};

export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Get My Items Error:', error);
    res.status(500).json({ success: false, message: 'Sunucu hatası. Ürünler getirilemedi.' });
  }
};

export const getItemById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Geçersiz ürün ID formatı.' });
    }

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Ürün bulunamadı.' });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error('Get Item By ID Error:', error);
    res.status(500).json({ success: false, message: 'Sunucu hatası. Ürün getirilemedi.' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { title, description, images, category, location, tags, status } = req.body;
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ success: false, message: 'Geçersiz ürün ID formatı.' });
    }

    let item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Güncellenecek ürün bulunamadı.' });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Bu ürünü güncelleme yetkiniz yok.' });
    }

    if (title) item.title = title;
    if (description !== undefined) item.description = description;
    if (images) item.images = images;
    if (category) item.category = category;
    if (location !== undefined) item.location = location;
    if (tags) item.tags = tags;
    if (status) item.status = status; 

    const updatedItem = await item.save();
    res.status(200).json({ success: true, data: updatedItem });

  } catch (error) {
    console.error('Update Item Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Sunucu hatası. Ürün güncellenemedi.' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ success: false, message: 'Geçersiz ürün ID formatı.' });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Silinecek ürün bulunamadı.' });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Bu ürünü silme yetkiniz yok.' });
    }

    await item.deleteOne(); 

    res.status(200).json({ success: true, message: 'Ürün başarıyla silindi.' });

  } catch (error) {
    console.error('Delete Item Error:', error);
    res.status(500).json({ success: false, message: 'Sunucu hatası. Ürün silinemedi.' });
  }
};

export const getAllAvailableItems = async (req, res) => {
  try {
    const { category: queryCategory, search, page = 1, limit = 10 } = req.query;
    const query = { status: 'Available' };

    if (queryCategory) {
      query.category = queryCategory;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search on title
    }

    const items = await Item.find(query)
      .populate('owner', 'firstName lastName avatarUrl rating') // Populate owner info
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Item.countDocuments(query); 

    res.status(200).json({
      success: true,
      data: items,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalItems: count
    });
  } catch (error) {
    console.error('Get All Available Items Error:', error);
    res.status(500).json({ success: false, message: 'Sunucu hatası. Ürünler getirilemedi.' });
  }
};