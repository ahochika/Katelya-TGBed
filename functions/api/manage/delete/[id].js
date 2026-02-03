export async function onRequest(context) {
    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;
    
    const fileId = params.id;
    console.log('Deleting file:', fileId);
    
    try {
      // 检查是否是 R2 存储的文件（以 r2: 开头）
      if (fileId.startsWith('r2:')) {
        const r2Key = fileId.replace('r2:', '');
        
        // 从 R2 存储桶中删除文件
        if (env.R2_BUCKET) {
          try {
            await env.R2_BUCKET.delete(r2Key);
            console.log('Deleted from R2:', r2Key);
          } catch (r2Error) {
            console.error('R2 delete error:', r2Error);
          }
        }
        
        // 从 KV 中删除元数据
        if (env.img_url) {
          await env.img_url.delete(fileId);
          console.log('Deleted from KV:', fileId);
        }
      } else {
        // Telegram 文件：只从 KV 中删除元数据
        // 注意：Telegram 频道中的文件无法通过 API 删除，只能删除 KV 中的记录
        if (env.img_url) {
          await env.img_url.delete(fileId);
          console.log('Deleted from KV:', fileId);
        }
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: '删除成功',
        fileId: fileId 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Delete error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }