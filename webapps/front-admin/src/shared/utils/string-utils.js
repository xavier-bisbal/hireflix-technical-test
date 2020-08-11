export const getInitials = (name) => {
    if (!name)
    {
        return "";
    }
    var initials = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    return initials.join('');
};
