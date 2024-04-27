exports.pagination = (skipDoc, limitDoc) => {
    const skip = Number(skipDoc) >= 0 ? parseInt(skipDoc, 10) : 0;
    const limit = Number(limitDoc) >= 10 ? parseInt(limitDoc, 10) : 10;
    return { skip, limit };
  };